'use client';

import { formatAmount } from '@/lib/utils';

const PaymentStats = ({ payments }: { payments: Payment[] }) => {
  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = payments.filter(p => p.status === 'completed').length;
  const pendingPayments = payments.filter(p => p.status === 'pending').length;

  return (
    <section className="total-balance">
      <div className="flex flex-col gap-6 w-full">
        <h2 className="header-2">
          Total Payments: {payments.length}
        </h2>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="total-balance-label">
              Total Amount Received
            </p>
            <p className="total-balance-amount">
              {formatAmount(totalAmount)}
            </p>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-14 font-medium text-green-600">Completed</p>
              <p className="text-24 font-semibold text-green-600">{completedPayments}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-14 font-medium text-yellow-600">Pending</p>
              <p className="text-24 font-semibold text-yellow-600">{pendingPayments}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PaymentStats