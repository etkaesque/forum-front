import { Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function Banner(props : {count : number}) {

  const router = useRouter()
  const count = props.count

  const handleRoute = (e : any) => {
    e.preventDefault()
    router.push('/ask')
  }

  return (
    <div className="relative flex justify-center w-full xl:w-6/12 h-full">

      <section className="flex flex-col myB gap-y-6 relative w-3/4 mx-10 p-5 xl:max-w-sm xl:fixed">
          <span className="text-md">Browse all {count} questions</span>
          <div className="flex flex-col sm:flex-row gap-2 w-full text-sm justify-between items-center gap-y-6">

            <Button
              onClick={handleRoute}
              variant="filled"
              rightSection={<IconArrowRight size={14} />}
            >
              Create Post
            </Button>

          </div>
        </section>

    </div>
    
  );
}

