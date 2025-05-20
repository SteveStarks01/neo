import HeaderBox from '@/components/HeaderBox'
import PaymentStats from '@/components/PaymentStats'
import RecentPayments from '@/components/RecentPayments'
import { getSchoolInfo } from '@/lib/actions/school.actions'
import { getSchoolPayments } from '@/lib/actions/payment.actions'
import { redirect } from 'next/navigation'

const SchoolDashboard = async () => {
  const school = await getSchoolInfo();
  
  if(!school) redirect('/school/register');

  const payments = await getSchoolPayments(school.$id);

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={school?.name || 'School'}
            subtext="Manage your school payments and view transaction history."
          />

          <PaymentStats payments={payments} />
        </header>

        <RecentPayments payments={payments} />
      </div>
    </section>
  )
}

export default SchoolDashboard