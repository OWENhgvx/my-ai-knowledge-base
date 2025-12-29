import { 
  Title, 
  Text, 
  SimpleGrid, 
  Card, 
  Group, 
  Button, 
  ThemeIcon, 
  ActionIcon,
  Badge,
  rem,
  Stack
} from '@mantine/core';
import { IconBook, IconCode, IconBallpen, IconPlus, IconDotsVertical, IconFiles } from '@tabler/icons-react';
import { Link } from 'react-router-dom'; 

export default function WorkspaceDashboard() {
  // 模拟多个知识库的数据
  const libraries = [
    { id: 1, title: '技术栈探索', count: 42, icon: IconCode, color: 'blue', desc: 'React, Rust, 大模型相关文档' },
    { id: 2, title: '阅读笔记', count: 15, icon: IconBook, color: 'orange', desc: '读书感悟、心理学、历史资料' },
    { id: 3, title: '英语学习', count: 8, icon: IconBallpen, color: 'green', desc: '外刊精读、语法总结、雅思词汇' },
  ];

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-end">
        <div>
          <Title order={2} fw={700}>我的知识库</Title>
          <Text c="dimmed" fz="sm">根据不同领域管理你的 AI 大脑</Text>
        </div>
        <Button 
          component={Link}           // 2. 指定渲染组件为 Link
          to="/library/create"       // 3. 设置跳转路径
          leftSection={<IconPlus size={18} />} 
          radius="md"
        >
          创建新库
        </Button>
      </Group>

      {/* 知识库网格列表 */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} gap="lg">
        {libraries.map((lib) => (
          <Card key={lib.id} withBorder padding="lg" radius="md" shadow="sm">
            <Card.Section withBorder inheritPadding py="xs">
              <Group justify="space-between">
                <ThemeIcon color={lib.color} variant="light" size="lg">
                  <lib.icon size={20} />
                </ThemeIcon>
                <ActionIcon variant="subtle" color="gray">
                  <IconDotsVertical size={16} />
                </ActionIcon>
              </Group>
            </Card.Section>

            <Stack mt="md" gap="xs">
              <Text fw={700} fz="lg">{lib.title}</Text>
              <Text fz="sm" c="dimmed" lineClamp={2} h={rem(40)}>
                {lib.desc}
              </Text>
            </Stack>

            <Group justify="space-between" mt="xl">
              <Group gap={5}>
                <IconFiles size={14} color="gray" />
                <Text fz="xs" c="dimmed">{lib.count} 个文档</Text>
              </Group>
              <Button variant="light" size="compact-xs">进入库</Button>
            </Group>
          </Card>
        ))}

        {/* 快速创建占位符 */}
        <Card 
          withBorder 
          padding="lg" 
          radius="md" 
          style={{ borderStyle: 'dashed', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => console.log('Create new')}
        >
          <Stack align="center" gap="xs">
            <IconPlus size={40} color="var(--mantine-color-gray-4)" />
            <Text c="dimmed" fw={500}>添加分类</Text>
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  );
}