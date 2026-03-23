export interface Habit {
  id: string;
  userId: string;
  name: string;
  icon: string;
  color: string;
  createdAt: string;
  isLog?: boolean;
}

export interface CreateBody {
  name: string;
  color: string;
  icon: string;
}
