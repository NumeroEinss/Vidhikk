import { Component } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {


  transactionList = [
    {
      transactionId: 'T1234-5678-9012-3456',
      date: '21-02-2023',
      remark: 'Payment for view details',
      time: '01:15 PM',
      amount: '499',
      status: 'Completed',
    },
    {
      transactionId: 'T1234-5678-9012-3456',
      date: '11-01-2023',
      remark: 'Payment for conference',
      time: '04:15 PM',
      amount: '499',
      status: 'Failed',
    },
    {
      transactionId: 'T1234-5678-9012-3456',
      date: '21-02-2023',
      remark: 'Payment for conference Ext',
      time: '04:45 PM',
      amount: '499',
      status: 'Completed',
    },
    {
      transactionId: 'T1234-5678-9012-3456',
      date: '21-02-2023',
      remark: 'Payment for view details',
      time: '01:15 PM',
      amount: '499',
      status: 'Pending',
    },
    {
      transactionId: 'T1234-5678-9012-3456',
      date: '21-02-2023',
      remark: 'Payment for view details',
      time: '01:15 PM',
      amount: '499',
      status: 'Completed',
    },
    {
      transactionId: 'T1234-5678-9012-3456',
      date: '21-02-2023',
      remark: 'Payment for view details',
      time: '01:15 PM',
      amount: '499',
      status: 'Completed',
    },
    {
      transactionId: 'T1234-5678-9012-3456',
      date: '21-02-2023',
      remark: 'Payment for view details',
      time: '01:15 PM',
      amount: '499',
      status: 'Completed',
    },
    {
      transactionId: 'T1234-5678-9012-3456',
      date: '21-02-2023',
      remark: 'Payment for view details',
      time: '01:15 PM',
      amount: '499',
      status: 'Completed',
    },
  ]
}
