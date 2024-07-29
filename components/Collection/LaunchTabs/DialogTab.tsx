import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import toast from "react-hot-toast";

export function DialogTab({
  setAddresses,
  setNumber,
  setAmount,
}: {
  setAddresses: (addresses: string[]) => void;
  setNumber: (numbere: number) => void;
  setAmount: (amount: string[] | number[]) => void;
}) {
  const validateAddresses = (input: string) => {
    const addresses = input.split("\n").map((addr) => addr.trim());
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    const invalidAddresses: string[] = [];

    const validAddresses = addresses.filter((address) => {
      const isValid = addressRegex.test(address);
      if (!isValid && address) {
        invalidAddresses.push(address);
      }
      return isValid;
    });

    if (invalidAddresses.length > 0) {
      toast.error(
        `No or Invalid address(es) detected: ${invalidAddresses.join(", ")}`
      );
      setAddresses([]);
    } else {
      setAddresses(validAddresses);
    }
  };

  const validateNumbers = (amts: string) => {
    // Split the input into lines and trim whitespace
    const numbers = amts.split("\n").map((num) => num.trim());

    // Regular expression to match valid numbers, including scientific notation
    const numberRegex = /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/;

    // Filter out valid numbers and convert them to actual number type
    const validNumbers = numbers
      .filter((number) => numberRegex.test(number)) // Validate with regex
      .map((number) => parseFloat(number)); // Convert to number

    // Return the array of valid numbers

    if (validNumbers.length !== 0) {
      toast.error(`No or Invalid number(s) detected:}`);
      setAmount([]);
    } else {
      setAmount(validNumbers);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-500 active:bg-green-700 text-neutral-50 flex-1 delay-75">
          Add Accounts
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Accoutns</DialogTitle>
          <DialogDescription>
            Add accounts to airdrop. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex items-center flex-col space-y-8 mt-5">
          <Textarea
            // onChange={(e) => setAddresses(e.currentTarget.value)}
            onChange={(e) => validateAddresses(e.currentTarget.value)}
            className="w-full min-h-[120px]"
            placeholder={`Enter each address on a new line, e.g.: \n0xab58…ec9b\n0xcd93…ec9b\n0xsr58…ec7b`}
          />
          <div className="w-full flex flex-col space-y-3 items-center">
            <Input
              onChange={(e) => setNumber(Number(e.currentTarget.value))}
              type="number"
              placeholder="Amount of NFTs per wallet"
              className="w-full min-h-[40px]"
            />
            <div className="text-lg">OR</div>
            <Textarea
              // onChange={(e) => setAmount(e.currentTarget.value)}
              onChange={(e) => validateNumbers(e.currentTarget.value)}
              placeholder={`Enter each amount on a new line, e.g.: \n1,\n5,\n3,`}
              className="w-full min-h-[120px]"
            />
          </div>
        </div>
        <DialogFooter>
          {/* <DialogClose asChild>
            <Button type="submit">Save changes</Button>
          </DialogClose> */}
          <Button onClick={() => validateNumbers()} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
