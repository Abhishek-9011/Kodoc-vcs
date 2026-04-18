import TextEditor from '@/components/TextEditor'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <div className="mx-auto min-h-screen max-w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.18)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className='text-center'>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Kodoc
              </h1>
            </div>
            <div className="space-y-2 text-right">
              <p className="max-w-xl text-sm leading-6 text-slate-600">
                Create, organize and manage your documents from a responsive sidebar interface.
              </p>
              
            </div>
          </div>
        </div>

        <TextEditor />
      </div>
    </div>
  )
}

export default Dashboard