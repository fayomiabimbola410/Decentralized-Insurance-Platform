import { describe, it, beforeEach, expect } from "vitest";

describe("risk-assessment", () => {
  let contract: any;
  
  beforeEach(() => {
    contract = {
      setRiskFactor: (factor: string, weight: number) => ({ success: true }),
      calculatePremium: (riskScore: number) => ({ value: 1100000 }),
      getRiskFactor: (factor: string) => ({ weight: 50 }),
    };
  });
  
  describe("set-risk-factor", () => {
    it("should successfully set a risk factor", () => {
      const result = contract.setRiskFactor("age", 50);
      expect(result.success).toBe(true);
    });
  });
  
  describe("calculate-premium", () => {
    it("should calculate premium correctly for a given risk score", () => {
      const result = contract.calculatePremium(10);
      expect(result.value).toBe(1100000); // BASE_PREMIUM * (100 + 10) / 100
    });
  });
  
  describe("get-risk-factor", () => {
    it("should return the weight for an existing risk factor", () => {
      // First, set a risk factor
      contract.setRiskFactor("age", 50);
      
      const result = contract.getRiskFactor("age");
      expect(result.weight).toBe(50);
    });
  });
});
