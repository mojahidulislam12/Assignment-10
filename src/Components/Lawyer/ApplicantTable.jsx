"use client";

import React from "react";
import { Table, Button } from "@heroui/react";
import { CircleArrowDownFill } from "@gravity-ui/icons";
import { UpdateApplication } from "@/lib/api/lawyer/action";
// import { updateHireRequest } from "@/lib/api/hire-request/action";

const ApplicantTable = ({ applicant = [] }) => {
  console.log(applicant);
  const handleApprove = async (id) => {
    const result = await UpdateApplication(id, { status: "pay now" });
    console.log(result);
    if (result?.modifiedCount) window.location.reload();
  };

  const handleReject = async (id) => {
    const result = await UpdateApplication(id, { status: "Rejected" });
    console.log(result);
    if (result?.modifiedCount) window.location.reload();
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const getStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "pay now":
        return {
          color: "text-success",
          label: "pay now",
        };

      case "rejected":
        return {
          color: "text-danger",
          label: "Rejected",
        };

      default:
        return {
          color: "text-warning",
          label: "Pending",
        };
    }
  };

  return (
    <div className="container mx-auto rounded-xl">
      <Table aria-label="Hiring Requests">
        <Table.ScrollContainer>
          <Table.Content>
            <Table.Header>
              <Table.Column isRowHeader={true}>CLIENT</Table.Column>
              <Table.Column>EMAIL</Table.Column>

              <Table.Column>PHONE</Table.Column>
              <Table.Column>MEETING</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>ACTIONS</Table.Column>
            </Table.Header>

            <Table.Body>
              {applicant.map((item) => {
                const id = item._id?.$oid || item._id;
                const status = getStatus(item.status);

                return (
                  <Table.Row key={id}>
                    <Table.Cell>{item.clientName}</Table.Cell>

                    <Table.Cell>{item.clientEmail}</Table.Cell>

                    <Table.Cell>{item.phone}</Table.Cell>

                    <Table.Cell>{formatDate(item.meetingDate)}</Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <CircleArrowDownFill
                          className={`w-2 h-2 ${status.color}`}
                        />
                        <span className={status.color}>{status.label}</span>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex gap-2">
                        {item.status !== "pay now" && (
                          <>
                            <Button
                              size="sm"
                              color="success"
                              variant="flat"
                              onClick={() => handleApprove(id)}
                            >
                              Accept
                            </Button>
                          </>
                        )}
                        {item.status !== "Rejected" && (
                          <>
                            <Button
                              size="sm"
                              color="danger"
                              variant="flat"
                              onClick={() => handleReject(id)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default ApplicantTable;
