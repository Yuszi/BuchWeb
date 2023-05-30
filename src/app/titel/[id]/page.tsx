"use client";
import axios from "axios";
import { useEffect } from "react";


async function getBooks(titelId: string){
    const res = await axios.get(
        `http://localhost:3000/titel=${titelId}`);
    return res.data;
}

export default async function ListBookWithTitel({ params }: any){
    const book = await getBooks(params.titel);

    useEffect(() => {
        console.log(book);
    }, []);
    return (
        <>
        <h1>LOOOL</h1>
        </>
    );
}