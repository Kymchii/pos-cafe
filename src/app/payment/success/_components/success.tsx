"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Success() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const { mutate } = useMutation({
    mutationKey: ["mutatedUpdateStatusOrder"],
    mutationFn: async () => {
      const { data } = await supabase
        .from("orders")
        .update({
          status: "settled",
        })
        .eq("order_id", orderId)
        .select()
        .single();

      if (data) {
        await supabase
          .from("tables")
          .update({
            status: "available",
          })
          .eq("id", data.table_id);
      }
    },
  });

  useEffect(() => {
    mutate();
  }, [orderId]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <CheckCircle className="size-15 text-green-500" />
      <h1 className="text-2xl font-bold">Payment Success</h1>
      <Link href="/order">
        <Button>Back to order</Button>
      </Link>
    </div>
  );
}
