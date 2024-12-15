import {
  Stack,
  Title,
  Button,
  Flex,
  CloseButton,
  Input,
  NativeSelect,
  Textarea,
  TextInput,
  Table,
  Drawer,
  Grid,
} from "@mantine/core";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import prisma from "prisma/prisma";
import { useLoaderData } from "@remix-run/react";
import { Status, Task } from "@prisma/client";

export const meta: MetaFunction = () => {
  return [
    { title: "CheckList" },
    { name: "description", content: "The CSRD audit app by Kiosk" },
  ];
};

export const handle = {
  breadcrumb: () => "CheckList",
};

// Fetch the tasks
export const loader: LoaderFunction = async () => {
  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      title: true,
      owner: true,
      state: true,
      description: true,
    },
  });
  return { tasks };
};

export default function Index() {
  const { tasks } = useLoaderData();
  const [taskFilter, setTaskFilter] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("");
  const users = useLoaderData();
  const [opened, { open, close }] = useDisclosure(false);
  const [formData, setFormData] = useState({
    title: "",
    ownerFirstName: "",
    ownerLastName: "",
    state: "TODO",
    order: "",
    description: "",
  });




  //Filter Founctions
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(taskFilter.toLowerCase()) &&
      task.owner.firstName.toLowerCase().includes(ownerFilter.toLowerCase())
  );

  const rows = filteredTasks.map((task) => (
    <Table.Tr key={task.id}>
      <Table.Td>{task.title}</Table.Td>
      <Table.Td>{task.state}</Table.Td>
      <Table.Td>
        {task.owner.firstName} {task.owner.lastName}
      </Table.Td>
      <Table.Td>{task.description}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Add New Task">
        <form>
          <TextInput
            label="Title"
            placeholder="Title"
            name="title"
            value={formData.title}
          />
          <TextInput
            label="Owner Name"
            placeholder="Owner  Name"
            name="ownerName"
            value={formData.ownerFirstName}
          />
          <NativeSelect
            label="Status"
            name="state"
            data={["TODO", "DOING", "DONE"]}
            value={formData.state}
          />
          <TextInput
            label="Order"
            placeholder="Order"
            name="order"
            value={formData.order}
          />
          <Textarea
            label="Description"
            placeholder="Description"
            name="description"
            value={formData.description}
          />
          <Button fullWidth mt="md" type="submit">
            Add Task
          </Button>
        </form>
      </Drawer>
      <Stack
        mr="auto"
        pt={20}
        pl={24}
        pr={24}
        justify="center"
        display="flex"
      >
        <Flex justify="space-between" style={{ width: "100%" }}>
          <Title>Task Management System!</Title>
          <Button variant="default" size="lg" onClick={open}>
            Add Task
          </Button>
        </Flex>
        <Grid>
          <Grid.Col span={4}>
            <Input
              placeholder="Filter By Title"
              value={taskFilter}
              onChange={(event) => setTaskFilter(event.currentTarget.value)}
              rightSectionPointerEvents="all"
              rightSection={
                <CloseButton
                  aria-label="Clear input"
                  onClick={() => setTaskFilter("")}
                  style={{ display: taskFilter ? undefined : "none" }}
                />
              }
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Input
              placeholder="Filter By Owner"
              value={ownerFilter}
              onChange={(event) => setOwnerFilter(event.currentTarget.value)}
              rightSectionPointerEvents="all"
              rightSection={
                <CloseButton
                  aria-label="Clear input"
                  onClick={() => setOwnerFilter("")}
                  style={{ display: ownerFilter ? undefined : "none" }}
                />
              }
            />
          </Grid.Col>
        </Grid>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Owner</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Stack>
    </>
  );
}
