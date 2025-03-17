"use server";

import axios from "axios";
import {
    InitializeOptions,
    InitializeResponse,
    VerifyResponse,
} from "chapa-nodejs";
import { GetBanksResponse } from "chapa-nodejs";
import { redirect } from "next/navigation";

// Initializes a payment transaction by making a request to the Chapa API.
export async function initializePayment(initializeOptions: InitializeOptions) {
        const response = await axios.post(
            "https://api.chapa.co/v1/transaction/initialize",
            initializeOptions,
            {
                headers: {
                    Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            });
        
            
            redirect(response.data.data.checkout_url)
            //return response.data; // Send response back to client
       
}

// Verifies a payment by checking its status using the provided tx_ref (transaction reference).

export async function verifyPayment(tx_ref: string): Promise<VerifyResponse> {
    try {
        const response = await axios.get(
            `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data; // Send response back to client
    } catch (error: any) {
        throw new Error(`Payment verification failed: ${error.message}`);
    }
}

// Retrieves a list of supported banks using the Chapa API.

export async function getBanks(): Promise<GetBanksResponse> {
    try {
        const response = await axios.get("https://api.chapa.co/v1/banks", {
            headers: {
                Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });

        return response.data; // Send response back to client
    } catch (error: any) {
        throw new Error(`Fetching banks failed: ${error.message}`);
    }
}