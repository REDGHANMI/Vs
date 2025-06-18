
import { Home, Map, BarChart3, Settings, Building2, Users, AlertTriangle, Menu, Calculator, Receipt } from "lucide-react"
import { Link } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Carte",
    url: "/",
    icon: Map,
  },
  {
    title: "Analytics",
    url: "/",
    icon: BarChart3,
  },
  {
    title: "Dépenses",
    url: "/expenses",
    icon: Calculator,
  },
  {
    title: "Compte de Résultat",
    url: "/profit-loss",
    icon: Receipt,
  },
  {
    title: "Sociétés",
    url: "/",
    icon: Building2,
  },
  {
    title: "Gérants",
    url: "/",
    icon: Users,
  },
  {
    title: "Alertes",
    url: "/",
    icon: AlertTriangle,
  },
  {
    title: "Paramètres",
    url: "/parameters",
    icon: Settings,
  },
]

export default function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200 bg-white shadow-sm" collapsible="icon">
      <SidebarHeader className="border-b border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <div className="group-data-[collapsible=icon]:hidden overflow-hidden">
            <h2 className="font-semibold text-gray-900 truncate">PETROMIN</h2>
            <p className="text-xs text-gray-500 truncate">Dashboard</p>
          </div>
          <div className="ml-auto flex-shrink-0">
            <SidebarTrigger className="h-8 w-8 hover:bg-gray-100 rounded-md transition-colors" />
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 group-data-[collapsible=icon]:sr-only">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200 group w-full"
                    tooltip={item.title}
                  >
                    <Link to={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-700 flex-shrink-0" />
                      <span className="font-medium group-data-[collapsible=icon]:sr-only">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
