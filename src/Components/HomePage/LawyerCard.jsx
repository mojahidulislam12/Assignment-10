"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardBody, CardFooter, Button } from "@heroui/react";

export default function LawyerCard({ lawyer }) {
  const { name, image, specialization, fee } = lawyer;

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Card.Header className="items-center text-center gap-4">
        <Image
          src={image}
          alt={name}
          width={120}
          height={120}
          className="rounded-full border-4 border-primary/20 object-cover"
        />

        <div>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-default-500">{specialization}</p>
        </div>

        <div className="rounded-xl bg-default-100 px-4 py-2">
          <p className="text-sm text-default-500">Consultation Fee</p>
          <p className="text-lg font-bold text-primary">${fee}</p>
        </div>
      </Card.Header>

      <Card.Footer>
        <Button as={Link} href={`/lawyers`} color="primary" className="w-full">
          View Details
        </Button>
      </Card.Footer>
    </Card>
  );
}
