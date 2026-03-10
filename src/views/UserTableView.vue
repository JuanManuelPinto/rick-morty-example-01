<script setup>
import { ref } from "vue";

const itemsPerPage = ref(10);
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);
const search = ref("");

const loadItems = async ({ page, itemsPerPage: limit }) => {
  loading.value = true;
  const skip = (page - 1) * limit;

  try {
    const baseUrl = search.value
      ? `https://dummyjson.com/users/search?q=${search.value}&`
      : `https://dummyjson.com/users?`;

    const response = await fetch(`${baseUrl}limit=${limit}&skip=${skip}`);
    const data = await response.json();

    serverItems.value = data.users;
    totalItems.value = data.total;
  } catch (error) {
    console.error("Error:", error);
    serverItems.value = [];
  } finally {
    loading.value = false;
  }
};

const headers = [
  { title: "Imagen", key: "image", sortable: false, width: "100px" },
  { title: "Nombre Completo", key: "firstName", align: "start" },
  { title: "Email", key: "email" },
  { title: "Edad", key: "age", align: "center" },
  { title: "Género", key: "gender", align: "center" },
  { title: "Empresa", key: "company.name" },
];
</script>

<template>
  <v-container fluid class="pa-6 pa-md-10">
    <v-card flat border class="main-card elevation-2">
      <v-card-title
        class="pa-8 d-flex flex-column flex-sm-row align-sm-center gap-6"
      >
        <div class="d-flex align-center">
          <span class="text-h5 font-weight-black letter-spacing-tight"
            >API USERS</span
          >
        </div>

        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          density="comfortable"
          label="Buscar por nombre ..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          rounded="lg"
          hide-details
          class="search-input"
          clearable
        ></v-text-field>
      </v-card-title>

      <v-divider></v-divider>

      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        :search="search"
        item-value="id"
        class="custom-table"
        :items-per-page-options="[5, 10, 25, 50]"
        hover
        @update:options="loadItems"
      >
        <template v-slot:item.image="{ item }">
          <v-avatar size="50" class="my-3 elevation-1 border-soft">
            <v-img :src="item.image" cover></v-img>
          </v-avatar>
        </template>

        <template v-slot:item.firstName="{ item }">
          <div class="user-name-cell">
            <span class="text-subtitle-1 font-weight-bold d-block">
              {{ item.firstName }} {{ item.lastName }}
            </span>
            <span class="text-caption text-medium-emphasis">{{
              item.username
            }}</span>
          </div>
        </template>

        <template v-slot:item.gender="{ item }">
          <v-chip
            :color="item.gender === 'male' ? 'blue-darken-1' : 'pink-lighten-1'"
            size="small"
            variant="tonal"
            class="text-uppercase font-weight-bold px-3"
          >
            {{ item.gender }}
          </v-chip>
        </template>

        <template v-slot:item.company.name="{ item }">
          <div class="company-cell">
            <span class="text-body-2 font-weight-medium text-medium-emphasis">
              {{ item.company.name }}
            </span>
          </div>
        </template>

        <template v-slot:loading>
          <v-skeleton-loader type="table-row-divider@5"></v-skeleton-loader>
        </template>
      </v-data-table-server>
    </v-card>
  </v-container>
</template>

<style scoped lang="scss">
.main-card {
  border-radius: 24px !important;
  background-color: rgb(var(--v-theme-surface)) !important;
  transition: all 0.3s ease;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;
}

.search-input {
  max-width: 100%;
  @media (min-width: 600px) {
    max-width: 400px;
  }
}

.custom-table {
  background-color: transparent !important;
  padding: 0 16px 16px 16px;

  :deep(thead) {
    th {
      background-color: rgba(var(--v-theme-on-surface), 0.02) !important;
      font-weight: 800 !important;
      color: rgb(var(--v-theme-primary)) !important;
      text-transform: uppercase;
      font-size: 0.7rem !important;
      letter-spacing: 1.2px !important;
      height: 56px !important;
      border-bottom: 2px solid rgba(var(--v-theme-primary), 0.1) !important;
    }
  }

  :deep(tbody tr) {
    height: 80px !important;
    transition: background-color 0.2s ease;

    td {
      border-bottom: 1px solid rgba(var(--v-border-color), 0.05) !important;
    }

    &:hover {
      background-color: rgba(var(--v-theme-primary), 0.04) !important;
    }
  }
}

.border-soft {
  border: 1px solid rgba(var(--v-border-color), 0.1) !important;
}

.letter-spacing-tight {
  letter-spacing: -0.5px;
}

.gap-6 {
  gap: 1.5rem;
}

.user-name-cell {
  line-height: 1.2;
}

:deep(.v-theme--dark) {
  .main-card {
    background-color: #1a1a1a !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
  }

  .custom-table :deep(thead th) {
    background-color: rgba(255, 255, 255, 0.03) !important;
  }
}

:deep(.v-theme--light) {
  .main-card {
    background-color: #ffffff !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
  }
}

:deep(.v-data-table-footer) {
  padding-top: 16px !important;
  border-top: 1px solid rgba(var(--v-border-color), 0.08) !important;

  .v-btn--icon {
    color: rgb(var(--v-theme-primary)) !important;
  }
}
</style>
