import { User } from "./auth.dto";
import { ActivityDataItem } from "./activities.dto";
export interface Subscription {
  id: number;
  user: User;
  activity: ActivityDataItem;
}

export interface createSubscription {
  userId: number;
  activityId: number;
}
