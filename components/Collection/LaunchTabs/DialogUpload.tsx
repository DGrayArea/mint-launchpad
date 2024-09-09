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
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";

export function DialogUpload({
  adde,
  amtArr,
  setAddresses,
  setNumber,
  setAmount,
  amtSwitch,
  setAmtSwitch,
  clear,
  switchInput,
  error,
  setError,
}: {
  adde: string;
  amtArr: string;
  setAddresses: (addresses: string) => void;
  setNumber: (numbere: number) => void;
  setAmount: (amount: string) => void;
  amtSwitch: boolean;
  setAmtSwitch: (bool: boolean) => void;
  switchInput: (bool: boolean) => void;
  setError: (bool: boolean) => void;
  error: boolean;
  clear: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={() => clear()}
          className="w-full relative h-auto inline-flex items-center justify-center rounded-xl transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 cursor-pointer disabled:bg-opacity-70 bg-green-500 active:bg-green-700 text-neutral-50 flex-1 delay-75"
        >
          Add Accounts
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Accounts</DialogTitle>
          <DialogDescription>
            Add accounts to airdrop.{" "}
            <b className="text-black">
              make sure to Click save when you&apos;re done.
            </b>
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex items-center flex-col space-y-3 mt-5">
          <Textarea
            value={adde}
            onChange={(e) => setAddresses(e.currentTarget.value)}
            className={`w-full min-h-[120px]`}
            placeholder={`Enter each address on a new line, e.g.: \n0xab58…ec9b\n0xcd93…ec9b\n0xsr58…ec7b`}
          />

          <div className="w-full flex flex-col space-y-3 items-center transition-all">
            {amtSwitch ? (
              <Input
                // value={amt}
                onChange={(e) => setNumber(Number(e.currentTarget.value))}
                type="number"
                placeholder="Amount of NFTs per wallet"
                className={`w-full min-h-[40px]`}
              />
            ) : (
              <Textarea
                value={amtArr}
                onChange={(e) => setAmount(e.currentTarget.value)}
                placeholder={`Enter each amount on a new line, e.g.: \n1,\n5,\n3,`}
                className={`w-full min-h-[120px] ${
                  error ? "border-red-500" : "border-black"
                }`}
              />
            )}
            <div className="w-full flex justify-end items-end">
              <Button
                onClick={() => {
                  setError(false);
                  setAmtSwitch(!amtSwitch);
                }}
                className="flex flex-row items-center"
                variant="outline"
              >
                Switch <ArrowPathRoundedSquareIcon className="w-5 ml-2" />
              </Button>
            </div>
            <div className="text-red-500 mt-2">
              {error ? "Invalid address or amount format entered" : ""}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => switchInput(false)} type="submit">
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
