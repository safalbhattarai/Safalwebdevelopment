package com.example.quickbazar.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Table(name = "product")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Product {
    @Id
    @SequenceGenerator(name = "item_seq_gen", sequenceName = "item_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "item_seq_gen", strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;


    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "subCategory_id", nullable = false)
    private SubCategory subCategory;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "product_brand", nullable = false)
    private String productBrand;

    @Column(name = "product_condition", nullable = false)
    private String productCondition;

    @Column(name = "product_price", nullable = false)
    private String price;


    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "product_discription", nullable = false)
    private String productDiscription;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "product_image")
    private String productImage;


}