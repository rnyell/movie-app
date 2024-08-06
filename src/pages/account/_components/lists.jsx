import { useLoader } from "@lib/hooks"
import { getUserLists } from "@lib/supabase/db"
import { Button } from "@lib/ui/components"
import { EllipsisVerticalIcon } from "@heroicons/solid"
import Section from "./section"

import classes from "./section.module.css"
import ListCard from "./list-card"

export default function Lists() {
  const { data: lists, isLoading } = useLoader(getUserLists)

  return (
    <Section sectionName="lists">
      <header className="flex">
        <h3 className="heading">Your Lists</h3>
        <Button
          variants="ghost"
          size="square-xs"
          customStyles="ml-auto"
          iconOnly
          iconSize="md"
          svg={<EllipsisVerticalIcon />}
        />
      </header>
      <div className={classes.container}>
        {lists?.map(list => (
          <ListCard
            key={list.id}
            list={list}
          />
        ))}
      </div>
    </Section>
  )
}
