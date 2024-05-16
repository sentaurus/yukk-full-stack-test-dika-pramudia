import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import {
    Select,
    SelectValue,
    SelectContent,
    SelectTrigger,
    SelectItem,
    SelectLabel,
    SelectGroup,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Transaction = ({ auth }: PageProps) => {
    const { data, setData, post, errors } = useForm({
        type: "",
        amount: "",
        information: "",
        proof: null,
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post(route("transactions.store"), {
            onSuccess: () => {
                setData({ type: "", amount: "", information: "", proof: null });
                toast({
                    title: "Transaction completed successfully!",
                    description:
                        "You have successfully completed a transaction!",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Transaction
                </h2>
            }
        >
            <Head title="Transaction" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-10">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-3 mb-5">
                                <Label>Type:</Label>
                                <Select
                                    value={data.type}
                                    onValueChange={(value) =>
                                        setData("type", value)
                                    }
                                >
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Type</SelectLabel>
                                            <SelectItem value="topup">
                                                Top-Up
                                            </SelectItem>
                                            <SelectItem value="transaction">
                                                Transaction
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.type && (
                                    <div className="text-red-500 text-sm">
                                        {errors.type}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-3 mb-3">
                                <Label htmlFor="amount">Amount:</Label>
                                <Input
                                    type="number"
                                    value={data.amount}
                                    onChange={(e) =>
                                        setData("amount", e.target.value)
                                    }
                                />
                                {errors.amount && (
                                    <div className="text-red-500 text-sm">
                                        {errors.amount}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-3 mb-3">
                                <Label htmlFor="information">
                                    Information:
                                </Label>
                                <Textarea
                                    value={data.information}
                                    onChange={(e) =>
                                        setData("information", e.target.value)
                                    }
                                />
                                {errors.information && (
                                    <div className="text-red-500 text-sm">
                                        {errors.information}
                                    </div>
                                )}
                            </div>
                            {data.type === "topup" && (
                                <div className="flex flex-col gap-3 mb-3">
                                    <Label htmlFor="proof">
                                        Proof of Top-Up:
                                    </Label>
                                    <Input
                                        id="proof"
                                        type="file"
                                        onChange={(e) => {
                                            const file: any = e?.target?.files;
                                            setData("proof", file[0]);
                                        }}
                                    />
                                    {errors.proof && (
                                        <div className="text-red-500 text-sm">
                                            {errors.proof}
                                        </div>
                                    )}
                                </div>
                            )}
                            <Button type="submit">Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Transaction;
