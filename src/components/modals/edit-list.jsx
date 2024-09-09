import { getListById } from "@lib/supabase/db"
import { useLoader } from "@lib/hooks"
import { Button, Modal } from "@lib/ui/components"

export default function EditList({ listId }) {
  const { data, setData, isLoading } = useLoader(() => getListById(listId))
  console.log(data)

  return (
    <Modal className="">
      <form>
        <div>

        </div>
        <Button size="md">
          Save Changes
        </Button>
      </form>
    </Modal>
  )
}
