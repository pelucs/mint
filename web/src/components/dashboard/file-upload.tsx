import '@uploadcare/react-uploader/core.css';

import { Button } from '../ui/button';
import { Paperclip } from 'lucide-react';
import { PopoverPortal } from '@radix-ui/react-popover';
import { FileUploaderMinimal } from '@uploadcare/react-uploader';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface FileUploadProps {
  attachments: Array<string>;
}

export function FileUpload({ attachments }: FileUploadProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm flex items-center gap-1.5">
        <Paperclip className="size-4"/>
        
        Anexo
      </label>

      <FileUploaderMinimal
        imgOnly={true}
        multipleMax={1}
        pubkey="62990ffaa9123e365258"
        maxLocalFileSizeBytes={10000000}
        classNameUploader="uc-dark uc-green"
      />

      {attachments.length > 0 && (
        <div className="space-y-2">          
          {attachments.map((attachment, i) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  key={attachment}
                  variant="outline"
                  className="w-full h-14 px-3 justify-start gap-2 border-dashed"
                >
                  <div className="size-8 rounded-md overflow-hidden">
                    <img 
                      alt="" 
                      src={attachment} 
                      className="w-full"
                    />
                  </div>

                  Anexo {i + 1}
                </Button>
              </PopoverTrigger>

              <PopoverPortal>
                <PopoverContent align='start' className="w-fit ">
                  <img 
                    alt="" 
                    src={attachment} 
                    className="h-full max-h-[350px] rounded-md"
                  />
                </PopoverContent>
              </PopoverPortal>
            </Popover>
          ))}
        </div>
      )}
    </div>
  );
}