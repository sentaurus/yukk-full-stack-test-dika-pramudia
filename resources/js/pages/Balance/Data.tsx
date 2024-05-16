import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FC } from "react";

interface Props {
    transactions: any;
    currentBalance: any;
}
const Data: FC<Props> = ({ transactions, currentBalance }: Props) => {
    const url = "http://localhost:8000/storage/";

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        });
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Transaction Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Proof</TableHead>
                    <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.data.map((transaction: any) => (
                    <TableRow key={transaction.id}>
                        <TableCell>{transaction.transaction_code}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>${transaction.amount}</TableCell>
                        <TableCell>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                disabled={transaction.proof === null}
                                onClick={() =>
                                    window.open(url + transaction.proof)
                                }
                            >
                                View Proof
                            </Button>
                        </TableCell>
                        <TableCell>
                            {formatDate(transaction.created_at)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>Current Balance:</TableCell>
                    <TableCell className="text-right">
                        ${currentBalance}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default Data;
