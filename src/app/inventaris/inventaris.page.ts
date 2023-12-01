// inventaris.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inventaris',
  templateUrl: './inventaris.page.html',
  styleUrls: ['./inventaris.page.scss'],
})
export class InventarisPage implements OnInit {
  dataInventaris: any = [];
  modalTambah = false;
  modalEdit = false;
  id: any;
  item: any;
  stok: any;
  tanggal: any;

  constructor(public apiService: ApiService, private modal: ModalController) {}

  ngOnInit() {
    this.getInventaris();
  }

  getInventaris() {
    this.apiService.tampil('tampilInventaris.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataInventaris = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  resetModel() {
    this.id = null;
    this.item = '';
    this.stok = '';
    this.tanggal = '';
  }

  openModalEdit(isOpen: boolean, itemId: any) {
    this.id = itemId;
    console.log('ID:', this.id);
    this.ambilInventaris(this.id);
    this.modalTambah = false;
    this.modalEdit = true;
  }

  openModalTambah(isOpen: boolean) {
    this.resetModel();
    this.modalTambah = true;
    this.modalEdit = false;
  }

  cancel() {
    this.modal.dismiss();
    this.modalTambah = false;
    this.resetModel();
  }

  tambahInventaris() {
    if (this.item !== '' && this.stok !== '') {
      const data = {
        item: this.item,
        stok: this.stok,
      };

      this.apiService.tambah(data, 'tambahInventaris.php').subscribe({
        next: (hasil: any) => {
          console.log('Berhasil tambah inventaris');
          this.resetModel();
          this.getInventaris();
          this.modalTambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('Gagal tambah inventaris', err);
        },
      });
    } else {
      console.log('Gagal tambah inventaris karena masih ada data yang kosong');
    }
  }

  hapusInventaris(id: any) {
    this.apiService.hapus(id,
      '/hapus.php?id=').subscribe({
      next: (res: any) => {
        console.log('Sukses', res);
        this.getInventaris();
        console.log('Berhasil hapus data');
      },
      error: (error: any) => {
        console.error('Gagal hapus data', error);
      }
    });
  }
  

  ambilInventaris(id: any) {
    this.apiService.lihat(id,
      '/lihat.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('Sukses', hasil);
        let Inventaris = hasil;
        this.id = Inventaris.id;
        this.item = Inventaris.nama;
        this.stok = Inventaris.jurusan;
        this.tanggal = Inventaris.tanggal;
      },
      error: (error: any) => {
        console.error('Gagal ambil data', error);
      }
    });
  }

  editInventaris() {
    const data = {
      id: this.id,
      item: this.item,
      stok: this.stok,
      tanggal: this.tanggal,
    };

    this.apiService.edit(data, 'editInventaris.php').subscribe({
      next: (hasil: any) => {
        console.log('Berhasil edit inventaris', hasil);
        this.resetModel();
        this.getInventaris();
        this.modalEdit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('Gagal edit inventaris', err);
      },
    });
  }
}
