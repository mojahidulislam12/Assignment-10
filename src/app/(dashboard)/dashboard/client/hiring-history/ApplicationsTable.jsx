"use client";

import Link from "next/link";
import React from "react";
import { Table, Chip, Button } from "@heroui/react";
import { Calendar, Person, ScalesBalanced } from "@gravity-ui/icons";

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusChip = (status = "pending") => {
  switch (status.toLowerCase()) {
    case "pending":
      return (
        <Chip variant="bordered" className="border-yellow-500 text-yellow-400">
          Pending
        </Chip>
      );

    case "accepted":
      return (
        <Chip color="success" variant="flat">
          Accepted
        </Chip>
      );

    case "rejected":
      return (
        <Chip color="danger" variant="flat">
          Rejected
        </Chip>
      );

    default:
      return <Chip>{status}</Chip>;
  }
};

export default function HistoryTable({ applicant }) {
  console.log(applicant);
  return (
    <div className="w-full bg-[#121212] rounded-xl border border-zinc-800 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Hiring History ({applicant.length})
      </h2>

      <Table
        className="w-full"
        classNames={{
          base: "bg-transparent",
          table: "border-collapse",
          thead: "[&>tr]:border-b [&>tr]:border-zinc-800",
          th: "bg-transparent text-zinc-400",
          td: "py-5",
          tr: "border-b border-zinc-800 hover:bg-zinc-900/50",
        }}
      >
        <Table.ScrollContainer>
          <Table.Content aria-label="Hiring History">
            <Table.Header>
              <Table.Column>LAWYER</Table.Column>
              <Table.Column>CASE</Table.Column>
              <Table.Column>MEETING</Table.Column>
              <Table.Column>APPLIED</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>ACTION</Table.Column>
            </Table.Header>

            {/* <Table.Body emptyContent="No hiring history found.">
              {applicant.map((item) => (
                <Table.Row key={item._id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Person className="w-5 h-5 text-blue-400" />
                      </div>

                      <div>
                        <p className="font-semibold text-white">
                          {item.lawyerName}
                        </p>

                        <p className="text-xs text-zinc-500">Lawyer</p>
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <ScalesBalanced className="w-4 h-4 text-zinc-500" />

                      {item.caseType}
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-zinc-500" />

                      {formatDate(item.meetingDate)}
                    </div>
                  </Table.Cell>

                  <Table.Cell>{formatDate(item.createdAt)}</Table.Cell>

                  <Table.Cell>{getStatusChip(item.status)}</Table.Cell>

                  <Table.Cell>
                    {item.status === "accepted" ? (
                      <Button
                        as={Link}
                        href={`/payment/${item._id}`}
                        size="sm"
                        color="success"
                      >
                        Pay Now
                      </Button>
                    ) : (
                      <Button size="sm" variant="light">
                        Details
                      </Button>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body> */}

            <Table.Body emptyContent="No hiring history found">
              {applicant.map((item) => (
                <Table.Row key={item._id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Person className="w-5 h-5 text-blue-400" />
                      </div>

                      <div>
                        <p className="font-semibold">{item?.lawyerName}</p>

                        <p className="text-xs text-zinc-500">Lawyer</p>
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell>{item.caseType}</Table.Cell>

                  <Table.Cell>${item.consultationFee}</Table.Cell>

                  <Table.Cell>{formatDate(item.createdAt)}</Table.Cell>

                  <Table.Cell>{getStatusChip(item.status)}</Table.Cell>

                  <Table.Cell>
                    {item.status === "accepted" ? (
                      // <Button
                      //   as={Link}
                      //   href={`/payment/${item._id}`}
                      //   color="success"
                      //   size="sm"
                      // >
                      //   Pay Now
                      // </Button>
                      <form action="/api/checkout_sessions" method="POST">
                        <section>
                          <button type="submit" role="link">
                            Checkout
                          </button>
                        </section>
                      </form>
                    ) : (
                      <Button variant="light" size="sm">
                        Details
                      </Button>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
