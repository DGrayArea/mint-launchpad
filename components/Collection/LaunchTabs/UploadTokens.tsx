import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import Papa from "papaparse";
import truncateEthAddress from "truncate-eth-address";
import { Textarea } from "@/components/ui/textarea";

type CsvData = {
  address: string;
  amount: string;
};

export function UploadTokens({
  error,
  addresses,
  setAddresses,
  amounts,
  resetAddress,
  resetAmount,
  setAmounts,
  setError,
  switchInput,
}: {
  error: boolean;
  addresses: string[];
  setAddresses: (addresses: string[]) => void;
  amounts: number[];
  resetAddress: (addresses: string) => void;
  resetAmount: (numbers: string) => void;
  setAmounts: (numbers: number[]) => void;
  setError: (numbers: boolean) => void;
  switchInput: (numbers: boolean) => void;
}) {
  const CSVUploader: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      Papa.parse<CsvData>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedAddresses: string[] = [];
          const parsedAmounts: number[] = [];
          const { data, errors } = results;

          if (errors.length) {
            setError(true);
            console.error("Parsing errors:", errors);
            setErrorMessage("Error parsing CSV. Please check the file format.");
            return;
          }

          // Validate and process the data
          data.forEach((row, index) => {
            if (row.address && row.amount) {
              const trimmedAddress = row.address.trim();
              const amount = parseFloat(row.amount);
              // Validate Ethereum address format
              const addressRegex = /^0x[a-fA-F0-9]{40}$/;
              if (addressRegex.test(trimmedAddress) && !isNaN(amount)) {
                parsedAddresses.push(trimmedAddress);
                parsedAmounts.push(amount);
              } else {
                console.warn(`Row ${index + 1} has invalid data.`);
              }
            }
          });

          if (parsedAddresses.length > 0 && parsedAmounts.length > 0) {
            setAddresses(parsedAddresses);
            setAmounts(parsedAmounts);
            setErrorMessage(null); // Clear any previous error messages
            resetAmount("");
            resetAddress("");
          } else {
            setErrorMessage("No valid data found in the CSV file.");
          }
        },
        error: (error) => {
          console.error("Error while parsing:", error.message);
          setErrorMessage("An error occurred while parsing the CSV file.");
        },
      });
    };

    return (
      <div className="container mx-auto">
        <div className="w-full flex items-center flex-col space-y-8 mt-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Upload Addresses</Label>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className={`${errorMessage ? "border border-red-500 mb-2" : ""}`}
            />
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-600 font-semibold">
            Error: {errorMessage}
          </div>
        )}

        {addresses.length > 0 && amounts.length > 0 && (
          <div className="mt-4 w-full overflow-x-auto overflow-y-auto max-h-56">
            <h3 className="text-lg font-semibold">Parsed Data:</h3>
            <table className="table-auto mt-2 w-full border-collapse border border-gray-200 overflow-x-auto overflow-y-auto max-h-20">
              <thead className="overflow-x-auto overflow-y-auto">
                <tr className="overflow-x-auto overflow-y-auto">
                  <th className="border px-4 py-2">Address</th>
                  <th className="border px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody className="overflow-x-auto overflow-y-auto">
                {addresses.map((address, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      {truncateEthAddress(address)}
                    </td>
                    <td className="border px-4 py-2">{amounts[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-500 active:bg-green-700 text-neutral-50 flex-1 delay-75 whitespace-nowrap">
          Upload Addresses
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Addresses</DialogTitle>
          <DialogDescription>
            Upload a csv file with addresses and the distribution rate. and make
            sure to include the tokensIds to be airdropped{" "}
            <b className="text-bold">Click save when you&apos;re done.</b>
          </DialogDescription>
        </DialogHeader>
        <CSVUploader />

        <div className="text-red-500 my-2">
          {error ? "Invalid format uploaded" : ""}
        </div>
        <DialogClose asChild>
          <Button onClick={() => switchInput(true)} type="submit">
            Save changes
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
