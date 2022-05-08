export type Props = {
  address: string;
  balance: number;
  error: string | null;
};

export type MapStateProps = Pick<Props, 'address' | 'balance' | 'error'>;
