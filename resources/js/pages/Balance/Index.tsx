import { usePage, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";

import List from "./List";
import Data from "./Data";

interface Link {
    url: string | null;
    label: string;
    active: boolean;
}

interface Transaction {
    id: number;
    transaction_code: string;
    type: string;
    amount: string;
    proof: string | null;
    description: string;
    created_at: string;
}

interface PageProps {
    transactions: {
        data: Transaction[];
        links: Link[];
        current_page: number;
        last_page: number;
    };
    [key: string]: any;
}

const Balance = ({ auth }: PageProps) => {
    const { transactions, currentBalance } = usePage<PageProps>().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Balance
                </h2>
            }
        >
            <Head title="Balance" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-10">
                        <Data
                            transactions={transactions}
                            currentBalance={currentBalance}
                        />
                        <List transactions={transactions} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Balance;
