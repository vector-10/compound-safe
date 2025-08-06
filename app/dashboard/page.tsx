import DashboardLayout from './components/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Dashboard Overview
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Total Supplied
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              $0.00
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Total Borrowed
            </h3>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              $0.00
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Health Factor
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              --
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}