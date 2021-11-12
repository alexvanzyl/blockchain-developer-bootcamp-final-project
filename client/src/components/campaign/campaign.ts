export interface Campaign {
  id: number;
  title: string;
  description: string;
  owner: string;
  fundingGoal: number;
  minimumContribution: number;
  totalFundingReceived: number;
  address: string;
  imageURL: string;
  timestamp: number;
  backers: number;
}
