import Footer from '@/app/layouts/_component/footer'
import PricingForm from './Component/PricingForm'
import PricingTable from './Component/PricingTable'

function PlanPricing() {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-1'>
        <PricingForm/>
        <PricingTable/>
      </div>
      <Footer/>
    </div>
  )
}

export default PlanPricing
