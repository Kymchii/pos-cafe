"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { Ban } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Failed() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const { mutate } = useMutation({
    mutationKey: ["mutatedUpdateStatusOrder"],
    mutationFn: async () => {
      await supabase
        .from("orders")
        .update({
          status: "settled",
        })
        .eq("order_id", orderId);
    },
  });

  useEffect(() => {
    mutate();
  }, [orderId]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <Ban className="size-15 text-red-500" />
      <h1 className="text-2xl font-bold">Payment Failed</h1>
      <Link href="/order">
        <Button>Back to order</Button>
      </Link>
    </div>
  );
}
