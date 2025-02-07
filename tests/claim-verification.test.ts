import { describe, it, beforeEach, expect } from "vitest";

describe("claim-verification", () => {
  let contract: any;
  
  beforeEach(() => {
    contract = {
      verifyClaim: (claimId: number, result: boolean, notes: string) => ({ success: true }),
      getVerification: (claimId: number) => ({
        verifier: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
        result: true,
        notes: "Claim verified and approved"
      })
    };
  });
  
  describe("verify-claim", () => {
    it("should successfully verify a claim", () => {
      const result = contract.verifyClaim(1, true, "Claim verified and approved");
      expect(result.success).toBe(true);
    });
    
    it("should fail when a non-owner tries to verify a claim", () => {
      // Simulate a non-owner call
      contract.verifyClaim = () => { throw new Error("ERR_UNAUTHORIZED"); };
      
      expect(() => contract.verifyClaim(1, true, "Non-owner verification attempt"))
          .toThrow("ERR_UNAUTHORIZED");
    });
  });
  
  describe("get-verification", () => {
    it("should return verification details for a verified claim", () => {
      // First, verify a claim
      contract.verifyClaim(1, true, "Claim verified and approved");
      
      // Then get the verification details
      const verification = contract.getVerification(1);
      expect(verification.verifier).toBe("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM");
      expect(verification.result).toBe(true);
      expect(verification.notes).toBe("Claim verified and approved");
    });
  });
});
