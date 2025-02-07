;; Risk Assessment Contract

(define-map risk-factors
  { factor: (string-ascii 50) }
  { weight: uint }
)

(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u401))
(define-constant BASE_PREMIUM u1000000) ;; 1 STX

(define-public (set-risk-factor (factor (string-ascii 50)) (weight uint))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_UNAUTHORIZED)
    (map-set risk-factors { factor: factor } { weight: weight })
    (ok true)
  )
)

(define-read-only (calculate-premium (risk-score uint))
  (let
    ((premium (* BASE_PREMIUM (+ u100 risk-score))))
    (/ premium u100)
  )
)

(define-read-only (get-risk-factor (factor (string-ascii 50)))
  (map-get? risk-factors { factor: factor })
)

