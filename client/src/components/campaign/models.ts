export interface Campaign {
  title: string;
  description: string;
  owner: string;
  fundingGoal: number;
  minimumContribution: number;
  totalFundingReceived: number;
  address: string;
  imageURL: string;
  timestamp: Date;
  backers: number;
}
