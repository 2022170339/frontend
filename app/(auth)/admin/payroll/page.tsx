import Image from 'next/image'


export default function Page() {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white text-black">
      <br />
      <div className="text-center mb-4 flex flex-direction-row justify-between">
        <div className="mx-auto">
          <Image src="/images/motor.png" width={150} height={100} alt="MotorPH Logo" />
        </div>
        <div className="text-left mb-4">
          <h1 style={{ color: '#1f3864', fontSize: '50px', fontFamily: 'Montserrat' }} className="text-2xl font-bold"><i>MotorPH</i></h1>
          <br />
          <p className="font-bold" style={{ color: '#1f3864', fontFamily: 'Montserrat' }}>7 Jupiter Avenue cor. F. Sandoval Jr., Bagong Nayon, Quezon City</p>
          <p className="font-bold" style={{ color: '#1f3864', fontFamily: 'Montserrat' }}>Phone: (028) 911-5071 / (028) 911-5072 / (028) 911-5073</p>
          <p className="font-bold" style={{ color: '#1f3864', fontFamily: 'Montserrat' }}>Email: corporate@motorph.com</p>
        </div>
      </div>
      <h2 style={{ color: '#1f3864', fontFamily: 'Montserrat' }} className="text-center text-xl font-bold mb-4"><u>EMPLOYEE PAYSLIP</u></h2>
      <table className="table-auto  w-[800px] mb-4">

        <tbody>
          <tr>
            <td className="border px-4 py-2w-[200px] text-white font-bold" style={{ background: '#333f4f', }}>PAYSLIP NO</td>
            <td className="border px-4 py-2 w-[200px]">31-2023-12-30</td>

            <td className="border px-4 py-2 w-[200px] text-white font-bold" style={{ background: '#333f4f', }}>PERIOD START DATE</td>
            <td className="border px-4 py-2 w-[200px]">12/18/2023</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 w-[200px] text-white font-bold" style={{ background: '#333f4f', }}>EMPLOYEE ID</td>
            <td className="border px-4 py-2 w-[200px]">15</td>

            <td className="border px-4 py-2 w-[200px] text-white font-bold" style={{ background: '#333f4f', }}>PERIOD END DATE</td>
            <td className="border px-4 py-2 w-[200px]">12/31/2023</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 w-[200px] text-white font-bold" style={{ background: '#333f4f', }}>EMPLOYEE NAME</td>
            <td className="border px-4 py-2 w-[200px]">Romualdez, Fredrick</td>

            <td className="border px-4 py-2 w-[200px] text-white font-bold" style={{ background: '#333f4f', }}>EMPLOYEE POSITION/DEPARTMENT</td>
            <td className="border px-4 py-2 w-[200px]">Account Manager / Accounting</td>
          </tr>
        </tbody>
      </table>


      <div className="mb-4">
        <h3 style={{ backgroundColor: '#333f4f' }} className="text-white p-2">EARNINGS</h3>
        <div className="border p-2">
          <p>Monthly Rate</p>
          <p className="text-right">₱53,500.00</p>
        </div>
        <div className="border p-2">
          <p>Daily Rate</p>
          <p className="text-right">₱2,675.00</p>
        </div>
        <div className="border p-2">
          <p>Days Worked</p>
          <p className="text-right">10</p>
        </div>
        <div className="border p-2">
          <p>Overtime</p>
          <p className="text-right">0</p>
        </div>
        <div className="border p-2 bg-zinc-100">
          <p className="font-bold">GROSS INCOME</p>
          <p className="text-right font-bold">₱26,750.00</p>
        </div>
      </div>
      <div className="mb-4">
        <h3 style={{ backgroundColor: '#333f4f' }} className="text-white p-2">BENEFITS</h3>
        <div className="border p-2">
          <p>Rice Subsidy</p>
          <p className="text-right">₱1,500.00</p>
        </div>
        <div className="border p-2">
          <p>Phone Allowance</p>
          <p className="text-right">₱2,000.00</p>
        </div>
        <div className="border p-2">
          <p>Clothing Allowance</p>
          <p className="text-right">₱1,000.00</p>
        </div>
        <div className="border p-2 bg-zinc-100">
          <p className="font-bold">TOTAL</p>
          <p className="text-right font-bold">₱4,500.00</p>
        </div>
      </div>
      <div className="mb-4">
        <h3 style={{ backgroundColor: '#333f4f' }} className="text-white p-2">DEDUCTIONS</h3>
        <div className="border p-2">
          <p>Social Security System</p>
          <p className="text-right">₱900.00</p>
        </div>
        <div className="border p-2">
          <p>Philhealth</p>
          <p className="text-right">₱450.00</p>
        </div>
        <div className="border p-2">
          <p>Pag-ibig</p>
          <p className="text-right">₱100.00</p>
        </div>
        <div className="border p-2">
          <p>Withholding Tax</p>
          <p className="text-right">₱0.00</p>
        </div>
        <div className="border p-2 bg-zinc-100">
          <p className="font-bold">TOTAL DEDUCTIONS</p>
          <p className="text-right font-bold">₱1,450.00</p>
        </div>
      </div>
      <div className="mb-4">
        <h3 style={{ backgroundColor: '#333f4f' }} className="text-white p-2">SUMMARY</h3>
        <div className="border p-2">
          <p>Gross Income</p>
          <p className="text-right">₱26,750.00</p>
        </div>
        <div className="border p-2">
          <p>Benefits</p>
          <p className="text-right">₱4,500.00</p>
        </div>
        <div className="border p-2">
          <p>Deductions</p>
          <p className="text-right">₱1,450.00</p>
        </div>
        <div className="border p-2 bg-zinc-100">
          <p className="font-bold"><u> TAKE HOME PAY</u></p>
          <p className="text-right font-bold">₱29,800.00</p>
        </div>
      </div>
    </div>
  )
}


