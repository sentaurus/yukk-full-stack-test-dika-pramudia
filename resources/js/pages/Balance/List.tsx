import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

interface Props {
    transactions: any;
}

const List: React.FC<Props> = ({ transactions }: Props) => {
    return (
        <div className="mt-5">
            <Pagination>
                <PaginationContent>
                    {transactions.links.map((link: any, index: any) => {
                        const regexPrevious = /&laquo;\s*Previous/;
                        const regexNext = /Next\s*&raquo;/;
                        const matchPrevious = link.label.match(regexPrevious);
                        const matchNext = link.label.match(regexNext);

                        if (matchNext)
                            return (
                                <PaginationItem key={index}>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            );
                        else if (matchPrevious)
                            return (
                                <PaginationItem key={index}>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                            );
                        else
                            return (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href={link.url || "#"}
                                        isActive={link.active}
                                    >
                                        {link.label}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                    })}
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default List;
