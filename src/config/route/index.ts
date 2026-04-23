import { Screen, Locked, Document, ToolBox, User } from '@vicons/carbon'
import { DashboardOutlined } from '@vicons/antd'

export const iconMap: Record<string, Component> = {
  'Dashboard': DashboardOutlined,
  'Workbench': Screen,
  'Document': Document,
  'Settings': ToolBox,
  'User': User,
  'Lock': Locked,
}
