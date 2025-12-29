import { 
  Title, 
  Text, 
  TextInput, 
  Textarea, 
  Button, 
  Stack, 
  Group, 
  Breadcrumbs, 
  Anchor, 
  Card, 
  ThemeIcon, 
  SimpleGrid,
  ColorSwatch,
  CheckIcon,
  rem,
  Box
} from '@mantine/core';
import { useState } from 'react';
import { IconChevronRight, IconPlus, IconCode, IconBook, IconBallpen, IconGhost, IconDatabase } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';

export default function LibraryCreatePage() {
  const navigate = useNavigate();
  
  // 1. 定义表单状态
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedIcon, setSelectedIcon] = useState('IconDatabase');

  // 预设图标库
  const icons = [
    { name: 'IconDatabase', component: IconDatabase },
    { name: 'IconCode', component: IconCode },
    { name: 'IconBook', component: IconBook },
    { name: 'IconBallpen', component: IconBallpen },
    { name: 'IconGhost', component: IconGhost },
  ];

  const colors = ['blue', 'cyan', 'grape', 'orange', 'green', 'red'];

  const CurrentIcon = icons.find(i => i.name === selectedIcon)?.component || IconDatabase;

  const handleCreate = () => {
    // 这里执行 API 提交逻辑
    console.log({ title, description, selectedColor, selectedIcon });
    navigate('/'); // 创建成功后跳回首页
  };

  return (
    <Stack gap="xl">
      {/* 面包屑 */}
      <Breadcrumbs separator={<IconChevronRight size={14} />}>
        <Anchor component={Link} to="/" fz="sm">我的知识库</Anchor>
        <Text c="dimmed" fz="sm">新建分类</Text>
      </Breadcrumbs>

      <Title order={2}>创建新的知识库</Title>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        {/* 左侧：配置表单 */}
        <Stack gap="lg">
          <TextInput
            label="库名称"
            placeholder="例如：React 源码深度解析"
            required
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
          />

          <Textarea
            label="简短描述"
            placeholder="这个库主要用来存放哪些资料？"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />

          <div>
            <Text fw={500} fz="sm" mb="xs">选择主题色</Text>
            <Group gap="xs">
              {colors.map((color) => (
                <ColorSwatch
                  key={color}
                  color={`var(--mantine-color-${color}-filled)`}
                  onClick={() => setSelectedColor(color)}
                  sx={{ cursor: 'pointer' }}
                >
                  {selectedColor === color && <CheckIcon style={{ width: rem(10), height: rem(10) }} />}
                </ColorSwatch>
              ))}
            </Group>
          </div>

          <div>
            <Text fw={500} fz="sm" mb="xs">选择图标</Text>
            <Group gap="sm">
              {icons.map((icon) => (
                <ThemeIcon
                  key={icon.name}
                  variant={selectedIcon === icon.name ? 'filled' : 'light'}
                  color={selectedIcon === icon.name ? selectedColor : 'gray'}
                  size="xl"
                  radius="md"
                  onClick={() => setSelectedIcon(icon.name)}
                  style={{ cursor: 'pointer' }}
                >
                  <icon.component size={24} />
                </ThemeIcon>
              ))}
            </Group>
          </div>

          <Group mt="xl">
            <Button variant="outline" color="gray" onClick={() => navigate('/')}>取消</Button>
            <Button color={selectedColor} leftSection={<IconPlus size={18} />} onClick={handleCreate}>
              立即创建
            </Button>
          </Group>
        </Stack>

        {/* 右侧：预览区 */}
        <Box>
          <Text fw={500} fz="sm" mb="xs" c="dimmed">卡片预览</Text>
          <Card withBorder padding="lg" radius="md" shadow="sm" style={{ maxWidth: 350 }}>
             <ThemeIcon color={selectedColor} variant="light" size="lg" mb="md">
                <CurrentIcon size={20} />
             </ThemeIcon>
             
             <Text fw={700} fz="lg">{title || '新知识库名称'}</Text>
             <Text fz="sm" c="dimmed" lineClamp={2} mt="xs" h={rem(40)}>
                {description || '这里会显示关于这个知识库的简短介绍...'}
             </Text>

             <Group justify="space-between" mt="xl">
                <Text fz="xs" c="dimmed">0 个文档</Text>
                <Button variant="light" size="compact-xs" color={selectedColor}>进入库</Button>
             </Group>
          </Card>
          
          <Alert variant="light" color="blue" title="提示" mt="xl" icon={<IconPlus size={16}/>}>
             创建后，你可以立即上传 PDF 或 Markdown 文件来训练这个库。
          </Alert>
        </Box>
      </SimpleGrid>
    </Stack>
  );
}

// 辅助组件：简单的提示框
function Alert({ title, children, color, icon, ...others }) {
    return (
        <Card withBorder radius="md" p="sm" bg={`var(--mantine-color-${color}-light)`} {...others}>
            <Group gap="xs" mb={4}>
                {icon}
                <Text fw={700} fz="sm">{title}</Text>
            </Group>
            <Text fz="xs">{children}</Text>
        </Card>
    );
}