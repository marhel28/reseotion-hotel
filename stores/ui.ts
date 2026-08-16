import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type UserRole = 'owner' | 'receptionist' | 'housekeeping'

export interface UserAccount {
  name: string
  role: UserRole
  roleTitle: string
  email: string
  initials: string
}

export const useUiStore = defineStore('ui', () => {
  const sidebarCollapsed = ref(false)
  const mobileDrawerOpen = ref(false)
  const activeRole = ref<UserRole>('owner')

  const accounts: Record<UserRole, UserAccount> = {
    owner: {
      name: 'Fadhel Ahmad',
      role: 'owner',
      roleTitle: 'Hotel Owner / GM',
      email: 'fadhel@aurorahotel.com',
      initials: 'FA'
    },
    receptionist: {
      name: 'Aditya Pratama',
      role: 'receptionist',
      roleTitle: 'Front Desk Agent',
      email: 'aditya@aurorahotel.com',
      initials: 'AP'
    },
    housekeeping: {
      name: 'Budi Santoso',
      role: 'housekeeping',
      roleTitle: 'Housekeeping Specialist',
      email: 'budi@aurorahotel.com',
      initials: 'BS'
    }
  }

  const currentUser = computed(() => accounts[activeRole.value] || accounts.owner)

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function openMobileDrawer() {
    mobileDrawerOpen.value = true
  }

  function closeMobileDrawer() {
    mobileDrawerOpen.value = false
  }

  function setRole(role: UserRole) {
    activeRole.value = role
  }

  return {
    sidebarCollapsed,
    mobileDrawerOpen,
    activeRole,
    currentUser,
    accounts,
    toggleSidebar,
    openMobileDrawer,
    closeMobileDrawer,
    setRole
  }
})
