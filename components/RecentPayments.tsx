import Link from 'next/link'
import { formatAmount, formatDateTime } from '@/lib/utils'

const RecentPayments = ({ payments }: { payments: Payment[] }) => {
  const recentPayments = payments.slice(0, 5);

  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent Payments</h2>
        <Link href="/school/payments" className="view-all-btn">
          View all
        </Link>
      </header>

      <div className="mt-6 space-y-4">
        {recentPayments.map((payment) => (
          <div key={payment.$id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col">
              <p className="text-16 font-semibold text-gray-900">{payment.description}</p>
              <p className="text-14 text-gray-500">{formatDateTime(new Date(payment.createdAt)).dateTime}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-16 font-semibold text-gray-900">{formatAmount(payment.amount)}</p>
              <span className={`text-12 px-2 py-1 rounded-full ${
                payment.status === 'completed' 
                  ? 'bg-green-100 text-green-800'
                  : payment.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {payment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentPayments