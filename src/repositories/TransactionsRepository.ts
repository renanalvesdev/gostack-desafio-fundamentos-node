import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    console.log('transacoes balanco: ', this.transactions);
    const income = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'income') return sum + transaction.value;
      else return sum + 0;
    }, 0);

    const outcome = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'outcome') return sum + transaction.value;
      else return sum + 0;
    }, 0);

    const total = income - outcome;

    let balance: Balance = { income, outcome, total };

    return balance;
    // TODO
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
