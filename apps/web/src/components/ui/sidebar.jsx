import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"
const SidebarContext = React.createContext(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider.")
  return context
}

const SidebarProvider = React.forwardRef(({ defaultOpen = true, open: openProp, onOpenChange, className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback((value) => {
    const next = typeof value === "function" ? value(open) : value
    onOpenChange ? onOpenChange(next) : _setOpen(next)
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }, [open, onOpenChange])
  const toggleSidebar = React.useCallback(() => isMobile ? setOpenMobile(v => !v) : setOpen(v => !v), [isMobile, setOpen])
  React.useEffect(() => {
    const handler = e => { if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) { e.preventDefault(); toggleSidebar() } }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [toggleSidebar])
  const value = React.useMemo(() => ({ state: open ? "expanded" : "collapsed", open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }), [open, setOpen, isMobile, openMobile, toggleSidebar])
  return <SidebarContext.Provider value={value}><TooltipProvider delayDuration={0}><div ref={ref} style={{ "--sidebar-width": SIDEBAR_WIDTH, "--sidebar-width-icon": SIDEBAR_WIDTH_ICON, ...style }} className={cn("group/sidebar-wrapper flex min-h-svh w-full", className)} {...props}>{children}</div></TooltipProvider></SidebarContext.Provider>
})
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
  if (collapsible === "none") return <div ref={ref} className={cn("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", className)} {...props}>{children}</div>
  if (isMobile) return <Sheet open={openMobile} onOpenChange={setOpenMobile}><SheetContent data-sidebar="sidebar" data-mobile="true" side={side} className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden" style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE }}><SheetHeader className="sr-only"><SheetTitle>Sidebar</SheetTitle><SheetDescription>Displays the mobile sidebar.</SheetDescription></SheetHeader><div className="flex h-full w-full flex-col">{children}</div></SheetContent></Sheet>
  return <div ref={ref} className="group peer hidden text-sidebar-foreground md:block" data-state={state} data-collapsible={state === "collapsed" ? collapsible : ""} data-variant={variant} data-side={side}><div className={cn("relative w-[--sidebar-width] bg-transparent transition-[width] duration-200", "group-data-[collapsible=offcanvas]:w-0", variant !== "sidebar" && "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]")} /><div className={cn("fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 md:flex", side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", variant !== "sidebar" ? "p-2" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]", className)} {...props}><div data-sidebar="sidebar" className="flex h-full w-full flex-col bg-sidebar">{children}</div></div></div>
})
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef(({ className, onClick, ...props }, ref) => { const { toggleSidebar } = useSidebar(); return <Button ref={ref} data-sidebar="trigger" variant="ghost" size="icon" className={cn("h-7 w-7", className)} onClick={e => { onClick?.(e); toggleSidebar() }} {...props}><PanelLeft /><span className="sr-only">Toggle Sidebar</span></Button> })
SidebarTrigger.displayName = "SidebarTrigger"
const SidebarRail = React.forwardRef(({ className, ...props }, ref) => { const { toggleSidebar } = useSidebar(); return <button ref={ref} data-sidebar="rail" aria-label="Toggle Sidebar" onClick={toggleSidebar} className={cn("absolute inset-y-0 z-20 hidden w-4 sm:flex", className)} {...props} /> })
SidebarRail.displayName = "SidebarRail"
const SidebarInset = React.forwardRef(({ className, ...props }, ref) => <main ref={ref} className={cn("relative flex w-full flex-1 flex-col bg-background", className)} {...props} />)
const SidebarInput = React.forwardRef(({ className, ...props }, ref) => <Input ref={ref} data-sidebar="input" className={cn("h-8 w-full bg-background shadow-none", className)} {...props} />)
const wrap = (name, tag, base, extra = {}) => { const C = React.forwardRef(({ className, ...props }, ref) => React.createElement(tag, { ref, ...extra, ...props, className: cn(base, className) })); C.displayName = name; return C }
const SidebarHeader = wrap("SidebarHeader", "div", "flex flex-col gap-2 p-2", { "data-sidebar": "header" })
const SidebarFooter = wrap("SidebarFooter", "div", "flex flex-col gap-2 p-2", { "data-sidebar": "footer" })
const SidebarContent = wrap("SidebarContent", "div", "flex min-h-0 flex-1 flex-col gap-2 overflow-auto", { "data-sidebar": "content" })
const SidebarGroup = wrap("SidebarGroup", "div", "relative flex w-full min-w-0 flex-col p-2", { "data-sidebar": "group" })
const SidebarGroupContent = wrap("SidebarGroupContent", "div", "w-full text-sm", { "data-sidebar": "group-content" })
const SidebarMenu = wrap("SidebarMenu", "ul", "flex w-full min-w-0 flex-col gap-1", { "data-sidebar": "menu" })
const SidebarMenuItem = wrap("SidebarMenuItem", "li", "group/menu-item relative", { "data-sidebar": "menu-item" })
const SidebarSeparator = React.forwardRef(({ className, ...props }, ref) => <Separator ref={ref} data-sidebar="separator" className={cn("mx-2 w-auto bg-sidebar-border", className)} {...props} />)
const SidebarGroupLabel = React.forwardRef(({ asChild = false, className, ...props }, ref) => { const C = asChild ? Slot : "div"; return <C ref={ref} data-sidebar="group-label" className={cn("flex h-8 items-center rounded-md px-2 text-xs font-medium", className)} {...props} /> })
const SidebarGroupAction = React.forwardRef(({ asChild = false, className, ...props }, ref) => { const C = asChild ? Slot : "button"; return <C ref={ref} data-sidebar="group-action" className={cn("absolute right-3 top-3.5 flex size-5 items-center justify-center rounded-md", className)} {...props} /> })
const sidebarMenuButtonVariants = cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none hover:bg-sidebar-accent", { variants: { variant: { default: "", outline: "bg-background shadow" }, size: { default: "h-8", sm: "h-7 text-xs", lg: "h-12" } }, defaultVariants: { variant: "default", size: "default" } })
const SidebarMenuButton = React.forwardRef(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => { const C = asChild ? Slot : "button"; const { isMobile, state } = useSidebar(); const button = <C ref={ref} data-sidebar="menu-button" data-size={size} data-active={isActive} className={cn(sidebarMenuButtonVariants({ variant, size }), className)} {...props} />; if (!tooltip) return button; const content = typeof tooltip === "string" ? { children: tooltip } : tooltip; return <Tooltip><TooltipTrigger asChild>{button}</TooltipTrigger><TooltipContent side="right" hidden={state !== "collapsed" || isMobile} {...content} /></Tooltip> })
const SidebarMenuAction = wrap("SidebarMenuAction", "button", "absolute right-1 top-1.5 flex size-5 items-center justify-center rounded-md", { "data-sidebar": "menu-action" })
const SidebarMenuBadge = wrap("SidebarMenuBadge", "div", "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs", { "data-sidebar": "menu-badge" })
const SidebarMenuSkeleton = React.forwardRef(({ className, showIcon = false, ...props }, ref) => <div ref={ref} className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)} {...props}>{showIcon && <Skeleton className="size-4" />}<Skeleton className="h-4 flex-1" /></div>)
const SidebarMenuSub = wrap("SidebarMenuSub", "ul", "mx-3.5 flex min-w-0 flex-col gap-1 border-l px-2.5", { "data-sidebar": "menu-sub" })
const SidebarMenuSubItem = React.forwardRef((props, ref) => <li ref={ref} {...props} />)
const SidebarMenuSubButton = React.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => { const C = asChild ? Slot : "a"; return <C ref={ref} data-sidebar="menu-sub-button" data-size={size} data-active={isActive} className={cn("flex h-7 items-center gap-2 rounded-md px-2 text-sm hover:bg-sidebar-accent", className)} {...props} /> })
export { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar }
