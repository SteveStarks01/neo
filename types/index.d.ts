declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type School = {
  $id: string;
  name: string;
  email: string;
  address: string;
  accountNumber: string;
  bankName: string;
  logo?: string;
}

declare type Student = {
  $id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  schoolId: string;
  class: string;
}

declare type Payment = {
  $id: string;
  amount: number;
  studentId: string;
  schoolId: string;
  paymentMethod: 'bank_transfer' | 'mobile_money' | 'card';
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  description: string;
  receiptUrl?: string;
  createdAt: string;
}

declare type PaymentFormData = {
  amount: string;
  paymentMethod: string;
  description: string;
}

declare interface ReceiptProps {
  payment: Payment;
  student: Student;
  school: School;
}

declare interface PaymentFormProps {
  student: Student;
  school: School;
}

declare interface QRCodeProps {
  data: string;
}