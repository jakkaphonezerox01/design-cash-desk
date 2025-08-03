import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PromptPayModal } from "@/components/PromptPayModal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">PromptPay Payment Demo</h1>
        <p className="text-xl text-muted-foreground mb-8">
          คลิกปุ่มด้านล่างเพื่อเปิดหน้าต่างการชำระเงิน
        </p>
        <Button 
          onClick={() => setIsModalOpen(true)}
          size="lg"
          className="bg-payment-success hover:bg-payment-success/90"
        >
          เปิดหน้าต่างชำระเงิน PromptPay
        </Button>
      </div>
      
      <PromptPayModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={50}
      />
    </div>
  );
};

export default Index;
