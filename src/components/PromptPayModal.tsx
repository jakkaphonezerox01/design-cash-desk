import { useState, useEffect } from "react";
import { X, Download, Upload, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PromptPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

export const PromptPayModal = ({ isOpen, onClose, amount }: PromptPayModalProps) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isTransferred, setIsTransferred] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setUploadedFile(file);
      setIsTransferred(true);
    }
  };

  // Generate a simple QR code pattern (placeholder)
  const QRCodePattern = () => (
    <div className="w-48 h-48 bg-white p-4 rounded-lg">
      <div className="grid grid-cols-21 gap-px w-full h-full">
        {Array.from({ length: 441 }, (_, i) => (
          <div
            key={i}
            className={`${
              Math.random() > 0.5 ? 'bg-black' : 'bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 bg-payment-modal border-payment-modal-border text-payment-modal-foreground">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">PromptPay QR</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-payment-modal-foreground hover:bg-payment-modal-border"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Amount Section */}
        <div className="bg-payment-amount-bg rounded-lg p-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">฿{amount}</div>
            <div className="flex items-center justify-center gap-2 text-payment-timer text-sm">
              <Clock className="w-4 h-4" />
              <span>เหลือเวลา {formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* QR Code Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-center">QR Code</h3>
            <div className="flex flex-col items-center space-y-4">
              <QRCodePattern />
              <p className="text-sm text-center text-muted-foreground">
                สแกนด้วยแอปธนาคาร
              </p>
            </div>
          </div>

          {/* Upload Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-center">อัพโหลดสลิป</h3>
            
            {isTransferred && (
              <div className="flex items-center gap-2 text-payment-success text-sm bg-payment-success-bg p-3 rounded-lg border border-payment-upload-border">
                <Check className="w-4 h-4" />
                <span>โอนเงินแล้ว?</span>
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              อัปโหลดการแจ้งหนี้
            </div>

            <Button 
              className="w-full bg-payment-success hover:bg-payment-success/90 text-white"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              ดาวน์โหลดสลิป
            </Button>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-payment-modal-border rounded-lg p-4 text-center">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  เลือกไฟล์สลิป
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, WEBP<br />
                  (สูงสุด 5MB)
                </div>
              </label>
            </div>

            {uploadedFile && (
              <div className="text-sm text-payment-success">
                ✓ อัปโหลด: {uploadedFile.name}
              </div>
            )}

            {/* Status */}
            <div className="bg-payment-modal-border rounded-lg p-3 text-center">
              <div className="text-sm">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>ระบบ</span>
                </div>
                <div>ตรวจสอบสถานะ</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};