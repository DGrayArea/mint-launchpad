import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";

export function Upload({ setFile }: { setFile: any }) {
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
            Upload a csv file with addresses and another with the distribution
            rate. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex items-center flex-col space-y-8 mt-5">
          <div className="grid w-full x max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Upload Addresses</Label>
            <Input onChange={(e) => console.log(e)} id="picture" type="file" />
          </div>
        </div>
        <DialogClose asChild>
          <Button type="submit">Save changes</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
