export interface Habit {
  id: string;
  userId: string;
  name: string;
  icon: string;
  color: string;
  createdAt: string;
  isLog?: boolean;
}
