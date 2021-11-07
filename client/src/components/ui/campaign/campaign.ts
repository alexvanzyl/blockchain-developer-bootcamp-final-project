export interface Campaign {
  id: number;
  name: string;
  description: string;
  owner: string;
  fundingGoal: number;
  totalFundingReceived: number;
  imageUrl: string;
  timestamp: number;
  backers: number;
}
