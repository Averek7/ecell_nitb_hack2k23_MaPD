import { body, validationResult } from 'express-validator';
import { addTransactionQuery, getCreditedTransactions, getDebitedTrasnactions } from '../db/transactions.js';
import log from '../../log.js';


const addTransaction = async (req,res) => {

    try {

        const { from_email, from_address, to_email, to_address, link } = req.body;
        const [re] = await addTransactionQuery({ from_email: from_email, from_address: from_address, to_email: to_email, to_address: to_address, link: link  });
        console.log(re);

        return res.status(200).json({
            message: 'success',
            response: "Added Successfully"
        })
    } catch (err) {
        log.error({err}, '[addTransaction][error]')

        return res.status(500).json({
            message: 'INTRENAL SERVER ERROR'
        })
    }
    
};


const getUserTransactions = async (req, res) => {
    

    try {

        const { email } = req.body;

        const [creditedData] = await getCreditedTransactions({email});
        const [debitedData] = await getDebitedTrasnactions({email});

        console.log(creditedData);
        console.log(debitedData);


        return res.status(200).json({
            message: 'success',
            response: {
                creditedData: creditedData,
                debitedData: debitedData
            }
        })
    } catch (err) {
        log.error({err}, '[getUserTransactions][error]')

        return res.status(500).json({
            message: 'INTRENAL SERVER ERROR'
        })
    }
    
};


export { addTransaction, getUserTransactions };