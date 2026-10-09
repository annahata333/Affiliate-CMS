import LoginForm from "@/components/LoginForm/LoginForm";

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Affiliate CMS
            </h1>
          </div>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
