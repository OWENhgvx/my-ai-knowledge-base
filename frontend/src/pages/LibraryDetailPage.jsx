import { useState } from 'react';
import { 
  Title, Text, Group, Button, Tabs, rem, 
  Table, Badge, ActionIcon, Stack, Card 
} from '@mantine/core';
import { 
  IconMessageCircle, IconFiles, IconUpload, 
  IconFileText, IconTrash, IconX, IconCheck 
} from '@tabler/icons-react';
import { Dropzone, PDF_MIME_TYPE, MS_WORD_MIME_TYPE } from '@mantine/dropzone';

export default function LibraryDetailPage() {
  const [activeTab, setActiveTab] = useState('files');

  // 模拟已上传的文件列表
  const [files, setFiles] = useState([
    { id: 1, name: 'React框架建议.pdf', size: '1.2mb', status: 'Ready', date: '2023-10-01' },
    { id: 2, name: '项目需求文档.docx', size: '800kb', status: 'Indexing', date: '2023-10-02' },
  ]);

  return (
    <Stack gap="lg">
      <div>
        <Title order={2}>技术栈探索</Title>
        <Text c="dimmed" fz="sm">管理此库中的文档或开始与 AI 对话</Text>
      </div>

      <Tabs value={activeTab} onChange={setActiveTab} variant="outline" radius="md">
        <Tabs.List>
          <Tabs.Tab value="chat" leftSection={<IconMessageCircle size={16} />}>
            对话
          </Tabs.Tab>
          <Tabs.Tab value="files" leftSection={<IconFiles size={16} />}>
            文档管理
          </Tabs.Tab>
        </Tabs.List>

        {/* --- 对话标签页 --- */}
        <Tabs.Panel value="chat" pt="xl">
          <Card withBorder h={500} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Text c="dimmed">这里是对话区域（开发中...）</Text>
          </Card>
        </Tabs.Panel>

        {/* --- 文件管理标签页 --- */}
        <Tabs.Panel value="files" pt="xl">
          <Stack gap="xl">
            {/* 上传区 */}
            <Dropzone
              onDrop={(files) => console.log('accepted files', files)}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={5 * 1024 ** 2} // 5MB
              accept={[...PDF_MIME_TYPE, ...MS_WORD_MIME_TYPE, 'text/markdown']}
              radius="md"
            >
              <Group justify="center" gap="xl" mih={120} style={{ pointerEvents: 'none' }}>
                <Dropzone.Accept>
                  <IconCheck size={52} color="var(--mantine-color-blue-6)" />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size={52} color="var(--mantine-color-red-6)" />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconUpload size={52} color="var(--mantine-color-dimmed)" />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    拖拽文件至此或点击上传
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    支持 PDF, Docx, Markdown，单个文件不超过 5MB
                  </Text>
                </div>
              </Group>
            </Dropzone>

            {/* 文件列表表格 */}
            <Card withBorder padding={0} radius="md">
              <Table verticalSpacing="sm" horizontalSpacing="md">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>文件名</Table.Th>
                    <Table.Th>状态</Table.Th>
                    <Table.Th>日期</Table.Th>
                    <Table.Th>操作</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {files.map((file) => (
                    <Table.Tr key={file.id}>
                      <Table.Td>
                        <Group gap="sm">
                          <IconFileText size={18} color="gray" />
                          <Text fz="sm" fw={500}>{file.name}</Text>
                          <Text fz="xs" c="dimmed">{file.size}</Text>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Badge 
                          color={file.status === 'Ready' ? 'green' : 'orange'} 
                          variant="light" 
                          size="sm"
                        >
                          {file.status === 'Ready' ? '已就绪' : '索引中...'}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text fz="xs" c="dimmed">{file.date}</Text>
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon variant="subtle" color="red">
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Card>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}