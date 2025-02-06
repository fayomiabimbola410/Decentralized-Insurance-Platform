;; Claim Verification Contract

(define-map verifications
  { claim-id: uint }
  {
    verifier: principal,
    result: bool,
    notes: (string-utf8 500)
  }
)

(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u401))
(define-constant ERR_ALREADY_VERIFIED (err u409))

(define-public (verify-claim (claim-id uint) (result bool) (notes (string-utf8 500)))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_UNAUTHORIZED)
    (asserts! (is-none (map-get? verifications { claim-id: claim-id })) ERR_ALREADY_VERIFIED)
    (map-set verifications
      { claim-id: claim-id }
      {
        verifier: tx-sender,
        result: result,
        notes: notes
      }
    )
    (ok true)
  )
)

(define-read-only (get-verification (claim-id uint))
  (map-get? verifications { claim-id: claim-id })
)

